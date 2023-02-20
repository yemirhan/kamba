import { Button, Menu } from "@mantine/core";
import {
  IconChartBar,
  IconChartPie,
  IconCurrencyLira,
  IconFilter,
  IconLayoutGrid,
  IconTimeline,
} from "@tabler/icons";
export const Dropdown = () => {
  return (
    <Menu>
      <Menu.Target>
        <Button leftIcon={<IconFilter size={14} />} color="teal" radius="sm">
          Veri Seç
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>Ürün Verileri</Menu.Label>
        <Menu.Item icon={<IconTimeline size={14} />}>
          En Çok Satılan Ürünler
        </Menu.Item>
        <Menu.Item icon={<IconTimeline size={14} />}>
          En Az Satılan Ürünler
        </Menu.Item>
        <Menu.Item icon={<IconTimeline size={14} />}>Tüm Ürünler</Menu.Item>
        <Menu.Divider />
        <Menu.Label>Kategori Verileri</Menu.Label>
        <Menu.Item icon={<IconChartBar size={14} />}>
          En Popüler Kategori
        </Menu.Item>
        <Menu.Item icon={<IconChartBar size={14} />}>
          En Az Popüler Kategori
        </Menu.Item>
        <Menu.Item icon={<IconChartBar size={14} />}>Tüm Kategoriler</Menu.Item>
        <Menu.Divider />
        <Menu.Label>Masa Verileri</Menu.Label>
        <Menu.Item icon={<IconLayoutGrid size={14} />}>
          En Popüler Masa
        </Menu.Item>
        <Menu.Divider />
        <Menu.Label>Ciro & Müşteri Verileri</Menu.Label>
        <Menu.Item icon={<IconCurrencyLira size={14} />}>Ciro</Menu.Item>
        <Menu.Item icon={<IconChartPie size={14} />}>
          Müşteri Yoğunluğu
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
