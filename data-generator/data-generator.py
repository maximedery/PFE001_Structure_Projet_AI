import json
import random
import string
import openpyxl
from openpyxl import Workbook

class Task:
    def __init__(self, type, field, config):
        self.type = type
        self.field = field
        self.config = config

    def generate_value(self, current_record):
        if self.type == "integer":
            return random.randint(self.config["lower_bound"], self.config["upper_bound"])
        elif self.type == "float":
            return random.uniform(self.config["lower_bound"], self.config["upper_bound"])
        elif self.type == "string":
            return ''.join(random.choices(string.ascii_letters, k=self.config["length"]))
        elif self.type == "dependent":
            dependency_field = self.config["depends_on"]
            condition = self.config["condition"]
            dependency_value = current_record[dependency_field]
            return eval(f"{dependency_value} {condition}")
        else:
            raise ValueError(f"Unsupported type: {self.type}")

def generate_random_data(tasks, num_records):
    data = []
    
    for _ in range(num_records):
        record = {}
        for task in tasks:
            record[task.field] = task.generate_value(record)
        data.append(record)
    
    return data

def write_to_excel(data, filename):
    workbook = Workbook()
    sheet = workbook.active
    
    # Write header
    headers = data[0].keys()
    sheet.append(list(headers))
    
    # Write data
    for record in data:
        sheet.append(list(record.values()))
    
    workbook.save(filename)

def main():
    # Load JSON rules from file
    with open('configs/generator-schema.json', 'r') as file:
        rules_config = json.load(file)
    
    rules = rules_config["rules"]
    num_records = rules_config["num_records"]
    
    # Create Task objects
    tasks = [Task(rule["type"], rule["field"], rule["config"]) for rule in rules]
    
    data = generate_random_data(tasks, num_records)
    write_to_excel(data, 'generated_data.xlsx')

if __name__ == "__main__":
    main()
