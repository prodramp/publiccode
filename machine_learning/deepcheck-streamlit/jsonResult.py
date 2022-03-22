import json
import streamlit as st


def select_deepcheck_specific_item(results, dc_selection):
    selected_report_item = None
    if len(results) > 0:
        for item in results:
            item_json = json.loads(item)
            if 'name' in item_json and item_json['name'] == dc_selection:
                selected_report_item = item_json
                # Break loop
                break
    return selected_report_item


def render_deepchecks_test_result(results, dc_selection):
    selected_report_json = select_deepcheck_specific_item(results, dc_selection)
    if 'header' in selected_report_json:
        st.header(selected_report_json['header'])
    if 'summary' in selected_report_json:
        st.info(selected_report_json['summary'])
    if 'value' in selected_report_json:
        st.success(selected_report_json['value'])
    if 'conditions_table' in selected_report_json:
        conditions_table = json.loads(selected_report_json['conditions_table'])
        if len(conditions_table) > 0:
            st.table(conditions_table)
    if 'display' in selected_report_json:
        display_data = selected_report_json['display']
        if len(display_data) > 0:
            for disp_item in display_data:
                header_item = None
                value_item = None
                if 'py/tuple' in disp_item:
                    item_data = disp_item['py/tuple']
                    if len(item_data) == 2:
                        header_item = item_data[0]
                        value_item = item_data[1]
                if header_item is not None and value_item is not None:
                    if header_item in ['str', 'html']:
                        st.write(value_item)
                    elif header_item == "dataframe":
                        st.dataframe(json.loads(value_item))
