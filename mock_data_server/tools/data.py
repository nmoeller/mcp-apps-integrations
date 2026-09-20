MOCK_DATA = [
	{
		"id": 1,
		"name": "Alice",
		"role": "Engineer",
		"tasks_completed": 12,
		"assigned_tasks": 7,
		"weekly_capacity": 6,
		"blocked_tasks": 2,
	},
	{
		"id": 2,
		"name": "Bob",
		"role": "Designer",
		"tasks_completed": 8,
		"assigned_tasks": 4,
		"weekly_capacity": 5,
		"blocked_tasks": 0,
	},
	{
		"id": 3,
		"name": "Charlie",
		"role": "Product Manager",
		"tasks_completed": 10,
		"assigned_tasks": 5,
		"weekly_capacity": 5,
		"blocked_tasks": 1,
	},
]


def get_mock_data() -> list[dict[str, int | str]]:
	"""Return a list of mock coworker records."""
	return MOCK_DATA
