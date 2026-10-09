// Medallion stages used by the lineage graph and the project cards.
export const STAGES = [
  { id: "bronze", label: "bronze", note: "raw, as it arrived" },
  { id: "silver", label: "silver", note: "cleaned and validated" },
  { id: "gold", label: "gold", note: "served to people" },
];

// match: skill names (as written in projects.json) that light up with a node.
export const NODES = [
  { id: "kafka", stage: "bronze", label: ["Kafka", "event streams"], match: ["Kafka"] },
  { id: "s3", stage: "bronze", label: ["S3 · APIs", "files and pulls"], match: ["AWS S3"] },
  { id: "legacy", stage: "bronze", label: ["Informatica", "legacy ETL"], match: [] },
  { id: "dbx", stage: "silver", label: ["Databricks", "PySpark · Spark"], match: ["Databricks", "PySpark", "Apache Spark", "Groq"] },
  { id: "dbt", stage: "silver", label: ["dbt", "SQL models"], match: ["dbt"] },
  { id: "delta", stage: "gold", label: ["Delta Lake", "Iceberg"], match: ["Delta Lake", "Apache Iceberg"] },
  { id: "athena", stage: "gold", label: ["Athena · Glue", "Redshift"], match: ["Athena", "AWS Glue", "Glue", "Redshift"] },
  { id: "bi", stage: "gold", label: ["Power BI", "Streamlit"], match: ["Power BI", "Streamlit"] },
];

export const TOOL_NODE = {
  id: "orchestration",
  label: ["Airflow · Azure Data Factory", "orchestrates every hop"],
  match: ["Airflow", "Azure Data Factory"],
};

export const EDGES = [
  ["kafka", "dbx"],
  ["s3", "dbx"],
  ["legacy", "dbx"],
  ["s3", "dbt"],
  ["dbx", "delta"],
  ["dbt", "delta"],
  ["dbx", "athena"],
  ["delta", "athena"],
  ["delta", "bi"],
];

// Where each project skill sits in the pipeline; anything else is tooling.
export const STAGE_OF = {
  Kafka: "bronze",
  "AWS S3": "bronze",
  Databricks: "silver",
  PySpark: "silver",
  "Apache Spark": "silver",
  dbt: "silver",
  Groq: "silver",
  "Apache Iceberg": "gold",
  "AWS Glue": "gold",
  Glue: "gold",
  Athena: "gold",
  Redshift: "gold",
  Streamlit: "gold",
};
