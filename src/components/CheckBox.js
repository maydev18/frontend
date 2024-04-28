import React, { useEffect, useState } from "react";
import Loader from "./Loader";




const CheckBox = () => {
    const [checkedSymptoms, setCheckedSymptoms] = useState([]);
    const [responseData, setResponseData] = useState(null);

    
    const ResponseModal = ({ disease, description, precautions, medications, diet, workout, onClose }) => {
        const [showLoader, setShowLoader] = useState(true);
    
        useEffect(() => {
            const timer = setTimeout(() => {
                setShowLoader(false);
            }, 1000);
    
            return () => clearTimeout(timer);
        }, []);
    
        return (
            <div className="modal-wrapper">
                <div className="backdrop"></div>
                <div className="modal">
                    <div className="modal-content">
                        {showLoader ? (
                            <Loader />
                        ) : (
                            <div className="card">
                                <div className="card-header">
                                    <span className="close" onClick={onClose}>&times;</span>
                                    <h2 className="disease-heading">Diagnosed Disease: {disease}</h2>
                                    <h3 className="description">{description}</h3>
                                </div>
                                <div className="card-body">
                                    <div className="details">
                                        <div className="precautions">
                                            <h3>Precautions</h3>
                                            <ul>
                                                {precautions && precautions.map((item, index) => (
                                                    <li key={index}>{item}</li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="medications">
                                            <h3>Medications</h3>
                                            <ul>
                                                {medications && medications.map((item, index) => (
                                                    <li key={index}>{item}</li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="diet">
                                            <h3>Preferred Diet</h3>
                                            <ul>
                                                {diet && diet.map((item, index) => (
                                                    <li key={index}>{item}</li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="workout">
                                            <h3>Workout</h3>
                                            <ul>
                                                {workout && workout.map((item, index) => (
                                                    <li key={index}>{item}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    };
    
    
    
    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setCheckedSymptoms([...checkedSymptoms, String(value)]);
        } else {
            setCheckedSymptoms(checkedSymptoms.filter(symptom => symptom !== String(value)));
        }
        console.log(checkedSymptoms);
    };
    
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (checkedSymptoms.length === 0) {
            window.alert('Please select at least one symptom.');
            return; 
        }
        const data = {
            symptoms : checkedSymptoms
        };

        try {
            const response = await fetch('https://disease-prediction-and-diagnosis-machine.onrender.com/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
        
            if (!response.ok) {
                throw new Error('Failed to send data to the server');
            }
        
            const responseData = await response.json();
            setResponseData(responseData);
            console.log('Response from server:', responseData);
        } catch (error) {
            window.alert('An error has occurred. Please try again later.');
            window.location.reload();
        }
        
    };
    const handleCloseModal = () => {
        setResponseData(null);
        window.location.reload();
    };
  return (
    
      <div className="my-container">
                <h1>Disease Prediction and Diagnosis Tool</h1>
                <h3>Simply select all the symptoms you are experiencing and click the "Submit" button.</h3>
                <form id="symptom-form">
        <div className="checkbox-group">
        <h2>General Symptoms</h2>
            <div className="symptoms box">
                <div className="eight">
                <label><input className="check" type="checkbox" name="symptom" value="itching" onChange={handleCheckboxChange}/> Itching</label>
                <label><input type="checkbox" name="symptom" value="skin_rash" onChange={handleCheckboxChange}/> Skin rash</label>
                <label><input type="checkbox" name="symptom" value="nodal_skin_eruptions" onChange={handleCheckboxChange}/> Nodal skin eruptions</label>
                <label><input type="checkbox" name="symptom" value="continuous_sneezing" onChange={handleCheckboxChange}/> Continuous sneezing</label>
                <label><input type="checkbox" name="symptom" value="shivering" onChange={handleCheckboxChange}/> Shivering</label>
                <label><input type="checkbox" name="symptom" value="chills" onChange={handleCheckboxChange}/> Chills</label>
                <label><input type="checkbox" name="symptom" value="joint_pain" onChange={handleCheckboxChange}/> Joint pain</label>
                <label><input type="checkbox" name="symptom" value="stomach_pain" onChange={handleCheckboxChange}/> Stomach pain</label>
                </div>
                <div className="eight">
                <label><input type="checkbox" name="symptom" value="acidity" onChange={handleCheckboxChange}/> Acidity</label>
                <label><input type="checkbox" name="symptom" value="ulcers_on_tongue" onChange={handleCheckboxChange}/> Ulcers on tongue</label>
                <label><input type="checkbox" name="symptom" value="muscle_wasting" onChange={handleCheckboxChange}/> Muscle wasting</label>
                <label><input type="checkbox" name="symptom" value="vomiting" onChange={handleCheckboxChange}/> Vomiting</label>
                <label><input type="checkbox" name="symptom" value="burning_micturition" onChange={handleCheckboxChange}/> Burning micturition</label>
                <label><input type="checkbox" name="symptom" value="spotting_urination" onChange={handleCheckboxChange}/> Spotting urination</label>
                <label><input type="checkbox" name="symptom" value="fatigue" onChange={handleCheckboxChange}/> Fatigue</label>
                <label><input type="checkbox" name="symptom" value="weight_gain" onChange={handleCheckboxChange}/> Weight gain</label>
                </div>
                <div className="eight">
                <label><input type="checkbox" name="symptom" value="anxiety" onChange={handleCheckboxChange}/> Anxiety</label>
                <label><input type="checkbox" name="symptom" value="cold_hands_and_feets" onChange={handleCheckboxChange}/> Cold hands and feet</label>
                <label><input type="checkbox" name="symptom" value="mood_swings" onChange={handleCheckboxChange}/> Mood swings</label>
                <label><input type="checkbox" name="symptom" value="weight_loss" onChange={handleCheckboxChange}/> Weight loss</label>
                <label><input type="checkbox" name="symptom" value="restlessness" onChange={handleCheckboxChange}/> Restlessness</label>
                <label><input type="checkbox" name="symptom" value="lethargy" onChange={handleCheckboxChange}/> Lethargy</label>
                <label><input type="checkbox" name="symptom" value="patches_in_throat" onChange={handleCheckboxChange}/> Patches in throat</label>
                <label><input type="checkbox" name="symptom" value="irregular_sugar_level" onChange={handleCheckboxChange}/> Irregular sugar level</label>
                </div>
            </div>
            <h2>Respiratory Symptoms</h2>
            <div className="symptoms box">
                <div className="eight">
                <label><input type="checkbox" name="symptom" value="cough" onChange={handleCheckboxChange}/> Cough</label>
                <label><input type="checkbox" name="symptom" value="high_fever" onChange={handleCheckboxChange}/> High fever</label>
                <label><input type="checkbox" name="symptom" value="sunken_eyes" onChange={handleCheckboxChange}/> Sunken eyes</label>
                <label><input type="checkbox" name="symptom" value="breathlessness" onChange={handleCheckboxChange}/> Breathlessness</label>
                <label><input type="checkbox" name="symptom" value="sweating" onChange={handleCheckboxChange}/> Sweating</label>
                <label><input type="checkbox" name="symptom" value="dehydration" onChange={handleCheckboxChange}/> Dehydration</label>
                <label><input type="checkbox" name="symptom" value="indigestion" onChange={handleCheckboxChange}/> Indigestion</label>
                <label><input type="checkbox" name="symptom" value="headache" onChange={handleCheckboxChange}/> Headache</label>
                </div>
                <div className="eight">
                <label><input type="checkbox" name="symptom" value="yellowish_skin" onChange={handleCheckboxChange}/> Yellowish skin</label>
                <label><input type="checkbox" name="symptom" value="dark_urine" onChange={handleCheckboxChange}/> Dark urine</label>
                <label><input type="checkbox" name="symptom" value="nausea" onChange={handleCheckboxChange}/> Nausea</label>
                <label><input type="checkbox" name="symptom" value="loss_of_appetite" onChange={handleCheckboxChange}/> Loss of appetite</label>
                </div>
            </div>
            <h2>Gastrointestinal Symptoms</h2>
            <div className="symptoms box">
                
                <div className="eight">
                <label><input type="checkbox" name="symptom" value="pain_behind_the_eyes" onChange={handleCheckboxChange}/> Pain behind the eyes</label>
                <label><input type="checkbox" name="symptom" value="back_pain" onChange={handleCheckboxChange}/> Back pain</label>
                <label><input type="checkbox" name="symptom" value="constipation" onChange={handleCheckboxChange}/> Constipation</label>
                <label><input type="checkbox" name="symptom" value="abdominal_pain" onChange={handleCheckboxChange}/> Abdominal pain</label>
                <label><input type="checkbox" name="symptom" value="diarrhoea" onChange={handleCheckboxChange}/> Diarrhoea</label>
                <label><input type="checkbox" name="symptom" value="mild_fever" onChange={handleCheckboxChange}/> Mild fever</label>
                <label><input type="checkbox" name="symptom" value="yellow_urine" onChange={handleCheckboxChange}/> Yellow urine</label>
                <label><input type="checkbox" name="symptom" value="yellowing_of_eyes" onChange={handleCheckboxChange}/> Yellowing of eyes</label>
                </div>
                <div className="eight">
                <label><input type="checkbox" name="symptom" value="acute_liver_failure" onChange={handleCheckboxChange}/> Acute liver failure</label>
                <label><input type="checkbox" name="symptom" value="swollen_extremeties" onChange={handleCheckboxChange}/> Swollen extremeties</label>
                <label><input type="checkbox" name="symptom" value="malaise" onChange={handleCheckboxChange}/> Malaise</label>
                <label><input type="checkbox" name="symptom" value="blurred_and_distorted_vision" onChange={handleCheckboxChange}/> Blurred and distorted vision</label>
                <label><input type="checkbox" name="symptom" value="phlegm" onChange={handleCheckboxChange}/> Phlegm</label>
                </div>
                
            </div>
            <h2>Musculoskeletal Symptoms</h2>
            <div className="symptoms box">
                
                <div className="eight"> 
                <label><input type="checkbox" name="symptom" value="throat_irritation" onChange={handleCheckboxChange}/> Throat irritation</label>
                <label><input type="checkbox" name="symptom" value="redness_of_eyes" onChange={handleCheckboxChange}/> Redness of eyes</label>
                <label><input type="checkbox" name="symptom" value="sinus_pressure" onChange={handleCheckboxChange}/> Sinus pressure</label>
                <label><input type="checkbox" name="symptom" value="runny_nose" onChange={handleCheckboxChange}/> Runny nose</label>
                <label><input type="checkbox" name="symptom" value="congestion" onChange={handleCheckboxChange}/> Congestion</label>
                <label><input type="checkbox" name="symptom" value="chest_pain" onChange={handleCheckboxChange}/> Chest pain</label>
                <label><input type="checkbox" name="symptom" value="dizziness" onChange={handleCheckboxChange}/> Dizziness</label>
                <label><input type="checkbox" name="symptom" value="loss_of_balance" onChange={handleCheckboxChange}/> Loss of balance</label>
                </div>
                <div className="eight">
                <label><input type="checkbox" name="symptom" value="unsteadiness" onChange={handleCheckboxChange}/> Unsteadiness</label>
                <label><input type="checkbox" name="symptom" value="confusion" onChange={handleCheckboxChange}/> Confusion</label>
                <label><input type="checkbox" name="symptom" value="irritability" onChange={handleCheckboxChange}/> Irritability</label>
                <label><input type="checkbox" name="symptom" value="visual_disturbances" onChange={handleCheckboxChange}/> Visual disturbances</label>
                <label><input type="checkbox" name="symptom" value="seizure" onChange={handleCheckboxChange}/> Seizure</label>
                </div>
               
            </div>
            <h2>Other Symptoms</h2>
            <div className="symptoms box">
               
                <div className="eight">
                <label><input type="checkbox" name="symptom" value="blood_in_sputum" onChange={handleCheckboxChange}/> Blood in sputum</label>
                <label><input type="checkbox" name="symptom" value="prominent_veins_on_calf" onChange={handleCheckboxChange}/> Prominent veins on calf</label>
                <label><input type="checkbox" name="symptom" value="palpitations" onChange={handleCheckboxChange}/> Palpitations</label>
                <label><input type="checkbox" name="symptom" value="painful_walking" onChange={handleCheckboxChange}/> Painful walking</label>
                <label><input type="checkbox" name="symptom" value="pain_in_anal_region" onChange={handleCheckboxChange}/> Pain in anal region</label>
                <label><input type="checkbox" name="symptom" value="bloody_stool" onChange={handleCheckboxChange}/> Bloody stool</label>
                <label><input type="checkbox" name="symptom" value="irritation_in_anus" onChange={handleCheckboxChange}/> Irritation in anus</label>
                <label><input type="checkbox" name="symptom" value="neck_pain" onChange={handleCheckboxChange}/> Neck pain</label>
                </div>
                <div className="eight">
                <label><input type="checkbox" name="symptom" value="dizziness" onChange={handleCheckboxChange}/> Dizziness</label>
                <label><input type="checkbox" name="symptom" value="cramps" onChange={handleCheckboxChange}/> Cramps</label>
                <label><input type="checkbox" name="symptom" value="bruising" onChange={handleCheckboxChange}/> Bruising</label>
                <label><input type="checkbox" name="symptom" value="bleeding" onChange={handleCheckboxChange}/> Bleeding</label>
                <label><input type="checkbox" name="symptom" value="clumsiness" onChange={handleCheckboxChange}/> Clumsiness</label>
                <label><input type="checkbox" name="symptom" value="swollen_lymph_nodes" onChange={handleCheckboxChange}/> Swollen lymph nodes</label>
                </div>
              
            </div>
        </div>
        <button onClick={handleSubmit} type="submit" className="btn-submit">Submit</button>
    </form>
    {responseData && (
                <ResponseModal 
                    disease={responseData.disease}
                    description = {responseData.description}
                    precautions = {responseData.precautions}
                    medications = {responseData.medications}
                    diet={responseData.diet}
                    workout={responseData.workout}
                    onClose={handleCloseModal}
                />
            )}
            </div>
    
  );
};

export default CheckBox;