/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useState, useMemo } from "react";

const useSortDataTable = (data, defaultSortColumn = "designation") => {
	const [sortColumn, setSortColumn] = useState(defaultSortColumn);
	const [sortDirection, setSortDirection] = useState("asc");

	const sortedData = useMemo(() => {
		return [...data].sort((a, b) => {
			if (a[sortColumn] < b[sortColumn]) return sortDirection === "asc" ? -1 : 1;
			if (a[sortColumn] > b[sortColumn]) return sortDirection === "asc" ? 1 : -1;
			return 0;
		});
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
