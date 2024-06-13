import uuid
import string
import random
import datetime
from enum import Enum

class Unit(Enum):
    Metric = 'metric'
    Imperial = 'imperial'

class Task:
    name_index = 1

    def __init__(self):
        """Create an task: the fields are auto-generate based on some hardcoded rules"""
        self.name = f"Task-{Task.name_index}"
        Task.name_index += 1
        code = uuid.uuid4()
        self.code = code  # Correct UUID generation
        self.unit = Unit.Metric
        self.field = 'N/A'  # not applicable at the moment
        self.alias = code.__str__()[0:8]
        self.durationDays = datetime.timedelta(days=random.randint(1, 90))
        self.budget = random.randint(1_000, 100_000)  # elaborate more budget in due time.
        self.depends_on_tasks = []

    def depends_on(self, depended_task):
        self.depends_on_tasks.append(depended_task)
    
    def __str__(self):
        return (f"Task Name: {self.name}\n"
                f"Code: {self.code}\n"
                f"Unit: {self.unit.value}\n"
                f"Field: {self.field}\n"
                f"Alias: {self.alias}\n"
                f"durationDays: {self.durationDays}\n"
                f"Budget: ${self.budget:,}\n")
        
# Example usage
if __name__ == "__main__":
    
    tasks = [Task() for _ in range(40)]
    for task in tasks:
        print(task)
        print("-" * 40)
    
    root = Task()
    subtask1 = Task()
    subtask2 = Task()
    subtask1_1 = Task()
    subtask1_2 = Task()
    subtask2_1 = Task()
