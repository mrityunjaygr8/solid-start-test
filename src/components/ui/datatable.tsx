import { ColumnDef, getPaginationRowModel } from "@tanstack/solid-table";
import {
	createSolidTable,
	flexRender,
	getCoreRowModel,
} from "@tanstack/solid-table";
import { Accessor, For, Show, splitProps } from "solid-js";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "~/components/ui/table";
import { Button } from "./button";

type Props<TData, TValue> = {
	columns: ColumnDef<TData, TValue>[];
	data: Accessor<TData[] | undefined>;
};

export const DataTable = <TData, TValue>(props: Props<TData, TValue>) => {
	const [local] = splitProps(props, ["columns", "data"]);

	const table = createSolidTable({
		get data() {
			return local.data() || [];
		},
		columns: local.columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
	});

	return (
		<div>
			<div class="rounded-md border">
				<Table>
					<TableHeader>
						<For each={table.getHeaderGroups()}>
							{(headerGroup) => (
								<TableRow>
									<For each={headerGroup.headers}>
										{(header) => {
											return (
												<TableHead>
													{header.isPlaceholder
														? null
														: flexRender(
															header.column
																.columnDef
																.header,
															header.getContext(),
														)}
												</TableHead>
											);
										}}
									</For>
								</TableRow>
							)}
						</For>
					</TableHeader>
					<TableBody>
						<Show
							when={table.getRowModel().rows?.length}
							fallback={
								<TableRow>
									<TableCell
										colSpan={local.columns.length}
										class="h-24 text-center"
									>
										No results.
									</TableCell>
								</TableRow>
							}
						>
							<For each={table.getRowModel().rows}>
								{(row) => (
									<TableRow
										data-state={row.getIsSelected() &&
											"selected"}
									>
										<For each={row.getVisibleCells()}>
											{(cell) => (
												<TableCell>
													{flexRender(
														cell.column.columnDef
															.cell,
														cell.getContext(),
													)}
												</TableCell>
											)}
										</For>
									</TableRow>
								)}
							</For>
						</Show>
					</TableBody>
				</Table>
			</div>
			<div class="flex items-center justify-end space-x-2 py-4">
				<Button
					variant="outline"
					size="sm"
					onClick={() => table.previousPage()}
					disabled={!table.getCanPreviousPage()}
				>
					Previous
				</Button>
				<Button
					variant="outline"
					size="sm"
					onClick={() => table.nextPage()}
					disabled={!table.getCanNextPage()}
				>
					Next
				</Button>
			</div>
		</div>
	);
};
