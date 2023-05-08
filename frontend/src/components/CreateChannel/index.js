import { useState } from "react";

const CreateChannel = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [teamId, setTeamId] = useState("");

  return (
    <form>
      <label>
        Name
        <input
          name="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>

      <label>
        Description
        <input
          name="description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>

      <label>
        Type
        <input
          name="type"
          type="text"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
      </label>

      <label>
        Image URL
        <input
          name="imageUrl"
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
      </label>

      <label>
        Team ID
        <input
          name="teamId"
          type="text"
          value={teamId}
          onChange={(e) => setTeamId(e.target.value)}
        />
      </label>
    </form>
  );
};

export default CreateChannel;
