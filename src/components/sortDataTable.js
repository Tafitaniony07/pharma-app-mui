/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useState, useMemo } from "react";

const useSortDataTable = (data, defaultSortColumn = "designation") => {
	const [sortColumn, setSortColumn] = useState(defaultSortColumn);
	const [sortDirection, setSortDirection] = useState("asc");

	const sortedData = useMemo(() => {
		if (data) {
			return [...data].sort((a, b) => {
				const aValue =
					sortColumn === "designation" || sortColumn === "famille" || sortColumn === "classe"
						? a.detail_product[sortColumn] // Accéder aux propriétés imbriquées
						: a[sortColumn];
				const bValue =
					sortColumn === "designation" || sortColumn === "famille" || sortColumn === "classe"
						? b.detail_product[sortColumn]
						: b[sortColumn];

				if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
				if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
				return 0;
			});
		}
	}, [data, sortColumn, sortDirection]);

	const handleSort = (column) => {
		if (column === sortColumn) {
			setSortDirection(sortDirection === "asc" ? "desc" : "asc");
		} else {
			setSortColumn(column);
			setSortDirection("asc");
		}
	};

	return {
		sortedData,
		sortColumn,
		sortDirection,
		handleSort,
	};
};

export default useSortDataTable;
