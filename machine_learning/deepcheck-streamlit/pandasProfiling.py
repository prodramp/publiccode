from pandas_profiling import ProfileReport


def pandas_profiling_report(df):
    df_report = ProfileReport(df, explorative=True)
    return df_report
