from prefab_ui.components.charts import (
	BarChart,
	ChartSeries,
	LineChart,
	PieChart,
)


def show_chart(
	data: list[dict[str, int | float | str]],
	x_axis: str,
	y_axis: str,
	series_label: str = "Value",
) -> BarChart:
	"""Render supplied records as a bar chart using the requested fields."""
	return BarChart(
		data=data,
		series=[ChartSeries(data_key=y_axis, label=series_label)],
		x_axis=x_axis,
		show_legend=False,
	)


def show_line_chart(
	data: list[dict[str, int | float | str]],
	x_axis: str,
	y_axis: str,
	series_label: str = "Value",
) -> LineChart:
	"""Render supplied records as a line chart using the requested fields."""
	return LineChart(
		data=data,
		series=[ChartSeries(data_key=y_axis, label=series_label)],
		x_axis=x_axis,
		show_dots=True,
		show_legend=False,
	)


def show_pie_chart(
	data: list[dict[str, int | float | str]],
	name_key: str,
	value_key: str,
) -> PieChart:
	"""Render supplied records as a pie chart using label and value fields."""
	return PieChart(
		data=data,
		data_key=value_key,
		name_key=name_key,
		show_label=True,
	)
