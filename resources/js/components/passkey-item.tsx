import { KeyRound, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import type { Passkey } from '@/types/auth';
import { Icon } from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemMedia,
    ItemTitle,
} from '@/components/ui/item';

type Props = {
    passkey: Passkey;
    onDelete: (id: number, onError: () => void) => void;
};

export default function PasskeyItem({ passkey, onDelete }: Props) {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = () => {
        setIsDeleting(true);
        onDelete(passkey.id, () => setIsDeleting(false));
    };

    return (
        <Item variant={'outline'} className="@container/item">
            <ItemMedia variant="icon">
                <Icon node={KeyRound} />
            </ItemMedia>
            <ItemContent>
                <ItemTitle>
                    <span className="line-clamp-1">{passkey.name}</span>
                    {passkey.authenticator && (
                        <Badge
                            variant={'secondary'}
                            className="text-muted-foreground"
                        >
                            {passkey.authenticator}
                        </Badge>
                    )}
                </ItemTitle>
                <ItemDescription className="text-xs">
                    Added {passkey.created_at_diff}
                    {passkey.last_used_at_diff && (
                        <>
                            <span className="mx-1 text-muted-foreground/50">
                                ·
                            </span>
                            Last used {passkey.last_used_at_diff}
                        </>
                    )}
                </ItemDescription>
            </ItemContent>
            <ItemActions>
                <AlertDialog>
                    <AlertDialogTrigger
                        render={<Button variant="ghost" size="icon" />}
                    >
                        <Icon node={Trash2} className="h-4 w-4" />
                        <span className="sr-only">Remove</span>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Remove passkey?</AlertDialogTitle>
                            <AlertDialogDescription>
                                You will no longer be able to use "
                                {passkey.name}" to sign in.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                                variant="destructive"
                                onClick={handleDelete}
                                disabled={isDeleting}
                            >
                                {isDeleting ? 'Removing...' : 'Remove passkey'}
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </ItemActions>
        </Item>
    );
}
