import {
	Pagination as PaginationComponent,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

interface PaginationProps {
	pageNo: number;
	totalPages: number;
	setPageNo: (pageNo: number) => void;
	className?: string;
}

export function Pagination({ pageNo, totalPages, setPageNo, className }: PaginationProps) {
	if (pageNo <= totalPages) {
		return (
			<PaginationComponent className={cn("justify-start", className)}>
				<PaginationContent>
					<PaginationItem>
						<PaginationPrevious
							onClick={() => {
								if (pageNo !== 1) setPageNo(pageNo - 1);
							}}
						/>
					</PaginationItem>
					{pageNo !== 1 && (
						<PaginationItem>
							<PaginationLink onClick={() => setPageNo(pageNo - 1)}>
								{pageNo - 1}
							</PaginationLink>
						</PaginationItem>
					)}
					<PaginationItem>
						<PaginationLink onClick={() => setPageNo(pageNo)} isActive>
							{pageNo}
						</PaginationLink>
					</PaginationItem>
					{pageNo + 1 <= totalPages && (
						<PaginationItem>
							<PaginationLink onClick={() => setPageNo(pageNo + 1)}>
								{pageNo + 1}
							</PaginationLink>
						</PaginationItem>
					)}
					{pageNo === 1 && totalPages > 2 && (
						<PaginationItem>
							<PaginationLink onClick={() => setPageNo(pageNo + 2)}>
								{pageNo + 2}
							</PaginationLink>
						</PaginationItem>
					)}
					{totalPages > 4 && (
						<PaginationItem>
							<PaginationEllipsis />
						</PaginationItem>
					)}
					<PaginationItem>
						<PaginationNext onClick={() => {
							if (pageNo !== totalPages) setPageNo(pageNo + 1);
						}} />
					</PaginationItem>
				</PaginationContent>
			</PaginationComponent>
		);
	}
}
