import streamlit as st
from streamlit_pandas_profiling import st_profile_report

import dataLoader
import pandasProfiling
import deepChecksReport
import jsonResult


def main():
    with st.sidebar.header("Source Data Selection:"):
        st.sidebar.write("select dataset")
        source_data = st.sidebar.file_uploader("Upload/select source (.csv) data", type=['csv'])
        st.sidebar.markdown("""[CSV samples at web](https://github.com/prodramp/publiccode/tree/master/datasets)""")
    df = None
    if source_data is not None:
        df = dataLoader.read_load_dataset(source_data)
    if df is not None:
        user_choices = ['Dataset Sample', 'Deepchecks Report', 'Pandas Profiling']
        selected_choice = st.sidebar.selectbox("Please select your choice:", user_choices)
        if selected_choice is not None:
            if selected_choice == 'Dataset Sample':
                st.info("Select dataset has " + str(df.shape[0]) + " rows and " + str(df.shape[1]) + " columns.")
                st.write(df.sample(10))
            elif selected_choice == 'Deepchecks Report':
                st.write("Deepchecks")
                name, results, result_keys = deepChecksReport.render_dc_report(df)
                st.write("Deepcheck Reports Type: " + name)
                dc_selection = None
                if len(result_keys) > 0:
                    dc_selection = st.sidebar.selectbox("Select Deepchecks Report Type:", result_keys)
                if dc_selection is not None:
                    jsonResult.render_deepchecks_test_result(results, dc_selection)
            elif selected_choice == "Pandas Profiling":
                df_report = pandasProfiling.pandas_profiling_report(df)
                st.write("Pandas Profiling Report")
                st_profile_report(df_report)

    else:
        st.error("Please select your source data to get started")


if __name__ == "__main__":
    st.set_page_config(page_title="Deepchecks Streamlit application", layout="wide")
    st.header("Deepcheck data validation with streamlit")
    main()
