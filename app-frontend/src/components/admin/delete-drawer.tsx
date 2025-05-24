"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import { MdDelete } from "react-icons/md";

interface DeleteDialogProps {
	title: string;
	description: string;
	onDelete: () => Promise<void>;
	deleteButton?: React.ReactNode;
}

export function DeleteDrawer({
	title,
	description,
	onDelete,
	deleteButton,
}: DeleteDialogProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);

	const handleDelete = async () => {
		setIsDeleting(true);
		try {
			await onDelete();
		} catch (error) {
			console.error("Delete operation failed:", error);
		} finally {
			setIsDeleting(false);
			setIsOpen(false);
		}
	};

	return (
		<Drawer open={isOpen} onOpenChange={setIsOpen}>
			<DrawerTrigger asChild>
				{deleteButton ?? (
					<Button variant="destructive" size="icon" className="w-8 h-8">
						<MdDelete />
					</Button>
				)}
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle>{title}</DrawerTitle>
					<DrawerDescription>{description}</DrawerDescription>
				</DrawerHeader>
				<DrawerFooter className="sm:flex-row sm:justify-end sm:space-x-2">
					<DrawerClose asChild>
						<Button variant="outline">Cancel</Button>
					</DrawerClose>
					<Button
						variant="destructive"
						onClick={handleDelete}
						disabled={isDeleting}
					>
						{isDeleting ? "Deleting..." : "Delete"}
					</Button>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}
