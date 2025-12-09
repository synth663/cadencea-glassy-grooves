import AxiosInstance from "../Axios"; // adjust if path differs

class ClientService {
  // Fetch all songs
  static async getSongs() {
    return AxiosInstance.get("api/songs/");
  }

  // Fetch one song by ID
  static async getSongById(songId) {
    return AxiosInstance.get(`api/songs/${songId}/`);
  }
}

export default ClientService;
