import "./App.css";
import { useState } from "react";

function App() {
  const [message, setMessage] = useState("");

  const handleCopytext = () => {
    navigator.clipboard.writeText(message);
  }
  const handleSubmit = (e: any) => {
    e.preventDefault();
    //check if the file is an audio file in mp3 format
    if (e.target.audio_file.files[0].type !== "audio/mpeg") {
      alert("Please upload a valid mp3 file");
      return;
    }

    const formData = new FormData(e.target);
    const audioFile = formData.get("audio_file");
    submitToServer(audioFile);
  };

  function submitToServer(audioFile: any) {
    const formData = new FormData();
    formData.append("audio_file", audioFile);
    fetch("http://127.0.0.1:5000/transcribe", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        setMessage(res.message);
      });
  }

  const handleProSubmit = (e: any) => {
    console.log(e.target.audio_file.files[0].type);
    e.preventDefault();
    console.log(e.target.audio_file.files[0].type === "audio/mpeg");
    //check if the file is an audio file in mp3 format
    if (e.target.audio_file.files[0].type !== "audio/mpeg") {
      alert("Please upload a valid mp3 file");
      return;
    }

    const formData = new FormData(e.target);
    const audioFile = formData.get("audio_file");
    submitToProServer(audioFile);
  };

  function submitToProServer(audioFile: any) {
    const formData = new FormData();
    formData.append("audio_file", audioFile);
    fetch("http://127.0.0.1:5000/transcribe_pro", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        setMessage(res.message);
        if(res.error) {
          alert(res.error);
        }
      }).catch((err) => {
        console.log(err);
      });
  }
  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="audio_file">
          <p>Submit to a normal transcribe</p>
          <input type="file" name="audio_file" id="audio_file" />
          <button type="submit">Submit</button>
        </label>
      </form>

      <form onSubmit={(e) => handleProSubmit(e)}>
        <label htmlFor="audio_file">
          <p>Submit to a pro transcribe</p>
          <input type="file" name="audio_file" id="audio_file" />
          <button type="submit">Submit</button>
        </label>
      </form>
      <div className="message-container">
        <button className="copy-text-button" onClick={handleCopytext}>Copy</button>
        <p className="message-text">
        {message}
        </p>
      </div>
    </>
  );
}

export default App;
