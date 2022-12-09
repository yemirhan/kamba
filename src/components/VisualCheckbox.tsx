import { UnstyledButton, Checkbox, Text, Image, SimpleGrid, createStyles } from '@mantine/core';
import { useUncontrolled } from '@mantine/hooks';


const useStyles = createStyles((theme, { checked }: { checked: boolean }) => ({
    button: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        transition: 'background-color 150ms ease, border-color 150ms ease',
        border: `1px solid ${checked
            ? theme.fn.variant({ variant: 'outline', color: theme.primaryColor }).border
            : theme.colorScheme === 'dark'
                ? theme.colors.dark[8]
                : theme.colors.gray[3]
            }`,
        borderRadius: theme.radius.sm,
        padding: theme.spacing.sm,
        backgroundColor: checked
            ? theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background
            : theme.colorScheme === 'dark'
                ? theme.colors.dark[8]
                : theme.white,
    },

    body: {
        flex: 1,
        marginLeft: theme.spacing.md,
    },
}));

interface ImageCheckboxProps {
    checked: boolean;
    defaultChecked?: boolean;
    onChange?(checked: boolean): void;
    onClick(t: "tables" | "inventory"): void
    title: string;
    
    icon: React.ReactNode,
    moduleType: any
}

export function VisualCheckbox({
    checked,
    defaultChecked,
    onChange,
    title,
    
    className,
    icon,
    onClick,
    moduleType,
    ...others
}: ImageCheckboxProps & Omit<React.ComponentPropsWithoutRef<'button'>, keyof ImageCheckboxProps>) {


    const { classes, cx } = useStyles({ checked });

    return (
        <UnstyledButton
            {...others}
            onClick={() => onClick(moduleType)}
            className={cx(classes.button, className)}
        >
            {icon}

            <div className={classes.body}>
                
                <Text weight={500} size="sm" sx={{ lineHeight: 1 }}>
                    {title}
                </Text>
            </div>

            <Checkbox
                checked={checked}

                tabIndex={-1}
                styles={{ input: { cursor: 'pointer' } }}
            />
        </UnstyledButton>
    );
}