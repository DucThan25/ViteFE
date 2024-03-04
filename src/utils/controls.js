export function selectFirstComboBoxItem (comboBox, keyField) {
  if (comboBox.DataSource && comboBox.DataSource.length > 0) {
    if (comboBox.hasOwnProperty('EditValue')) {
      comboBox.EditValue = comboBox.DataSource[0][keyField]
    }
  }
}
export function loadComboBoxItems (comboBox, items, keyField, selectedIndex) {
  if (comboBox.hasOwnProperty('Items')) {
    comboBox.Items = items
  } else if (comboBox.hasOwnProperty('DataSource')) {
    comboBox.DataSource = items
  }

  if (!items || items.length == 0) return

  if (keyField && selectedIndex >= 0 && items[selectedIndex]) {
    if (comboBox.hasOwnProperty('SelectedValue')) {
      comboBox.SelectedValue = items[selectedIndex][keyField]
    } else if (comboBox.hasOwnProperty('EditValue')) {
      comboBox.EditValue = items[selectedIndex][keyField]
    }
  }
}
