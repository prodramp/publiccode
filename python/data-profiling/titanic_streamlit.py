import pandas as pd
import pandas_profiling
import streamlit as st
from streamlit_pandas_profiling import st_profile_report
from pandas_profiling import ProfileReport


data_source_url = "https://raw.githubusercontent.com/prodramp/publiccode/master/datasets/titanic.csv"
df = pd.read_csv(data_source_url)

variables={
        "descriptions": {
            "Survived": "Passenger survived or not",
            "Cabin": "Cabin Type, where passenger was staying during the travel",
            "Ticket": "Unique ticket ID for each individual passenger",
            "Fare": "Actual Fare amount in pounds paid by the passenger",
            "Pclass": "Passenger travelling class",
            "SibSp": "Total number of siblings travelling with the passenger besides himself or herself",
            "Parch": "Total number of parents of children travelling for this passenger",
        }
    }

titanic_report = ProfileReport(df,
                        title="Titanic Dataset Profiling Details with updated Variables",
        dataset={
        "description": "This profiling report contains Titanic Dataset Profiling details.",
        "copyright_holder": "Prodramp Inc.",
        "copyright_year": "2022",
        "url": "https://prodramp.com",
    }, variables = variables) 

titanic_report

st.title("Titanic Dataset Profiling in Streamlit!")
st.write(df)
st_profile_report(titanic_report)

