Big Data Coursework 2 – Patient Healthcare Data Processing
Project Overview

This project focuses on cleaning, standardizing, and aggregating healthcare datasets to produce a patient-centric view suitable for analytics and cloud storage. Three separate CSV datasets were used:

Demographics – Contains patient-level information such as patient_id, age, gender, race, region, and ssn.

Conditions – Contains patient health information, including condition_code, description, and diagnosis_date.

Visits – Contains hospital visit records, including visit_date, visit_type, and duration_days.

The goal was to clean the data, handle missing or inconsistent values, join the datasets, and aggregate conditions and visits per patient, while also implementing privacy measures such as hashing sensitive identifiers (patient_id and ssn).

Environment Setup

PySpark on Google Colab

Java 11 installed for Spark (openjdk-11-jdk-headless)

Process and Steps
1. Data Loading

CSV files were loaded using spark.read.option("header", True).option("inferSchema", True).csv().

Checked data structure using .show(), .printSchema(), .describe(), and .summary() for initial insights.

2. Data Cleaning and Standardization

Dates: Converted diagnosis_date and visit_date to timestamp format for consistency.

Nulls: Checked for missing values in all datasets and documented counts per column.

Duplicates: Verified that patient_id is unique in demographics and consistent across datasets.

Categorical Fields: Inspected values in gender, race, region, and ssn for consistency.

3. Aggregation

Used collect_list and struct functions to aggregate all conditions and visits per patient:

4. Joining Data

Joined demographics with aggregated conditions and visits using patient_id as the key.

Used left joins to preserve patients without recorded visits or conditions.

Resulting patients DataFrame is nested per patient, containing:
Patient demographics
List of conditions
List of visits

5. Privacy Measures

Hashing: patient_id and ssn were hashed using SHA-256 to protect sensitive information.

Generalization: Age could be binned (not shown in code but recommended) to reduce re-identification risk.

Result: Data is anonymized but still usable for aggregation and analytics.

Problems Encountered and Solutions

| Problem                   | Cause                                                 | Solution                                                                                             |
| ------------------------- | ----------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| SparkSession conflicts    | Colab may have an existing Spark session              | Stopped current session with `spark.stop()` before starting a new one                                |
| Date inconsistencies      | Diagnosis and visit dates were in string format       | Converted to timestamp using `to_timestamp()` for consistency                                        |
| Privacy concerns          | Patient IDs and SSNs exposed real identities          | Hashed sensitive identifiers using SHA-256                                                           |
| Joining multiple datasets | Patients without visits or conditions could be lost   | Used **left joins** to retain all patients                                                           |

Steps to Resolve SSL / Connection Issues with MongoDB Atlas
1. Create a MongoDB Atlas Project
   If SSL errors occur, sometimes creating a new project resolves misconfigurations.
   
3. Configure Database User

Go to Security → Database Access → Database Users.

Select your user or create a new one.

Under Built-in Roles, select Atlas Admin temporarily for testing.

This grants full access to all clusters in the project.

Important: Reduce privileges in production for security.

Turn off “Restrict Access to Specific Clusters / Federated DB Instances / Stream Processing Workspaces” temporarily if necessary.

Click Update User.

3. Configure IP Access

Go to Security → Network Access → IP Access List.

Add your system IP address.

For debugging or testing only, you can add 0.0.0.0/0 to allow all IPs.

⚠️ Security warning: This exposes your database — remove this in production.

4. Connect to Cluster

Go to Clusters → Connect → Connect your application.

Choose your driver (Python, Node.js, etc.) and copy the connection string.

Replace <password> in the string with your actual database user password.

Example Python connection string (using pymongo):

from pymongo import MongoClient

client = MongoClient("mongodb+srv://username:<password>@cluster0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
db = client['myDatabase']

5. Test the Connection

Run a simple query to make sure the connection works:

print(db.list_collection_names())

6. Production Safety Tips

Remove 0.0.0.0/0 IP access once debugging is done.

Restrict database user privileges to the minimum necessary.

Use environment variables or secrets manager to store passwords instead of hardcoding them.

Outcome

Produced a clean, standardized, and anonymized patient-centric dataset.

Nested structure allows easy insertion into MongoDB

Data is suitable for:

Analytics (visits per patient, condition frequency)

ML modeling (predicting visit types, condition trends)

Cloud storage with minimal privacy risk
