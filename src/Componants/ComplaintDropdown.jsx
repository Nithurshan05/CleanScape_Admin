import { useNavigate } from 'react-router-dom';

function ComplaintDropdown() {
  const navigate = useNavigate();

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue) {
      navigate(selectedValue);
    }
  };

  return (
    <select className="complaint-dropdown" onChange={handleSelectChange} defaultValue="">
      <option value="" disabled >
        Manage Complaints
      </option>
      <option value="/GuestComplaints">Guest Complaints</option>
      <option value="/GarbageComplaints">Garbage Complaints</option>
      <option value="/RoadComplaints">Road Complaints</option>
      <option value="/LightsComplaints" >Street Light Complaints</option>
    </select>
  );
}

export default ComplaintDropdown;
