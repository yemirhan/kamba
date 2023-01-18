import { IncomingHttpHeaders } from "http";
import type { NextApiRequest, NextApiResponse } from "next";
import { Webhook, WebhookRequiredHeaders } from "svix";
import { buffer } from "micro";
import { prisma } from "@acme/db"
// Disable the bodyParser so we can access the raw
// request body for verification.
function upsert(externalId: string, attributes: Omit<EventData, "id">) {

  return prisma.user.upsert({
    where: { externalId: externalId },
    update: {
      avatar: attributes.profile_image_url,
      email: attributes?.email_addresses?.[0]?.email_address || undefined,
      name: attributes.first_name + " " + attributes.last_name,
    },
    create: {
      avatar: attributes.profile_image_url,
      email: attributes?.email_addresses?.[0]?.email_address || undefined,
      name: attributes.first_name + " " + attributes.last_name,
      externalId: externalId,
    },
  });
}
export const config = {
  api: {
    bodyParser: false,
  },
};

const webhookSecret = process.env.SVIX_WEBHOOK_SECRET || "whsec_F860cdS+FsxC7RsWVwKdXCQHUeY15MSa";

export default async function handler(
  req: NextApiRequestWithSvixRequiredHeaders,
  res: NextApiResponse
) {
  // Verify the webhook signature
  // See https://docs.svix.com/receiving/verifying-payloads/how
  const payload = (await buffer(req)).toString();
  const headers = req.headers;
  const wh = new Webhook(webhookSecret);
  let evt: Event | null = null;
  try {
    evt = wh.verify(payload, headers) as Event;
  } catch (_) {
    return res.status(400).json({});
  }

  // Handle the webhook
  const eventType: EventType = evt.type;
  if (eventType === "user.created" || eventType === "user.updated") {
    const { id, ...attributes } = evt.data;
    await upsert(id as string, attributes);
  }

  res.json({});
}

type NextApiRequestWithSvixRequiredHeaders = NextApiRequest & {
  headers: IncomingHttpHeaders & WebhookRequiredHeaders;
};

// Generic (and naive) way for the Clerk event
// payload type.
type EventData = {
  "birthday": string,
  "created_at": number,
  "email_addresses": {
    "email_address": string,
    "id": string,
    "linked_to": [],
    "object": string,
    "verification": {
      "status": string,
      "strategy": string
    }
  }[],
  "external_accounts": [],
  "external_id": string,
  "first_name": string,
  "gender": string,
  "id": string,
  "last_name": null | string,
  "last_sign_in_at": null,
  "object": string,
  "password_enabled": boolean,
  "phone_numbers": [],
  "primary_email_address_id": string,
  "primary_phone_number_id": null | string,
  "primary_web3_wallet_id": null,
  "private_metadata": Record<string, string | number>,
  "profile_image_url": string,
  "public_metadata": Record<string, string | number>,
  "two_factor_enabled": string,
  "unsafe_metadata": Record<string, string | number>
  "updated_at": number,
  "username": null | string,
  "web3_wallets": []
}
type Event = {
  data: EventData;
  object: "event";
  type: EventType;
};

type EventType = "user.created" | "user.updated" | "*";


