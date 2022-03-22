import pandas as pd
import streamlit as st

@st.cache
def read_load_dataset(source_data):
    df = pd.read_csv(source_data)
    return df
