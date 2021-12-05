import React from 'react'
import useForm from '../hooks/form.js';
import { useContext, useState } from 'react';
import { SettingsContext } from '../context/settings';
import { Button, FormGroup, InputGroup, Card, Elevation, RadioGroup, Radio } from "@blueprintjs/core";

const SettingsForm = () => {
  const settings = useContext(SettingsContext);

  const { handleChange, handleSubmit } = useForm(updateSettings);

  const [selectedSortRadioBtn, setSelectedSortRadioBtn] = useState()
  const [selectedCompleteRadioBtn, setSelectedCompleteRadioBtn] = useState()

  function updateSettings(userInput) {
    //update submitted values, or use old value if non provided
    settings.setCompleted(userInput['Blueprint3.RadioGroup-0'] || settings.setCompleted);
    settings.setSortBy(userInput['Blueprint3.RadioGroup-1'] || settings.sortBy);
    settings.setNumItemsPerPage(userInput['itemsPerPage'] || settings.setNumItemsPerPage);

    alert('Your settings have been applied!')
  }

  return (
    <div className="flex-container">
      <form onSubmit={handleSubmit}>
        <div className="bp3-callout bp3-intent-success form-caption">
          <h4 className="bp3-heading">Modify App Settings</h4>
          Todo the Way You Want to
        </div>

        <Card interactive={false} elevation={Elevation.TWO}>
          <FormGroup minimal={true}>
            <label htmlFor="itemsPerPages">Number of Todo Items Per Page</label>
            <InputGroup type="number" id="itemsPerPage" name="itemsPerPage" min="1" max="20" onChange={handleChange} />
            <br />

            <RadioGroup
                label="Show Completed Items"
                onChange={handleChange}
                selectedValue={selectedCompleteRadioBtn}
              >
              <Radio label="Yes! I want to keep track of what I've done." onClick={(e) => setSelectedCompleteRadioBtn(e.target.value)} value="true" />
              <Radio label="No! It's in the past." onClick={(e) => setSelectedCompleteRadioBtn(e.target.value)} value="false"  />
            </RadioGroup>
            <br/>

            <RadioGroup
              label="Sort By"
              onChange={handleChange}
              selectedValue={selectedSortRadioBtn}
            >
              <Radio label="Difficulty: High to Low" onClick={(e) => setSelectedSortRadioBtn(e.target.value)} value="difficultyHighToLow" />
              <Radio label="Difficulty: Low to High" onClick={(e) => setSelectedSortRadioBtn(e.target.value)} value="difficultyLowToHigh"  />
              <Radio label="Assignee" onClick={(e) => setSelectedSortRadioBtn(e.target.value)} value="assignee" />
            </RadioGroup>
          
            <br/><Button className="submit-btn" type="submit" intent="success">Confirm Changes</Button>
          </FormGroup>
        </Card>
      </form>
    </div>
  );
}

export default SettingsForm;