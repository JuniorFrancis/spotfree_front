import AbstractService from "services/AbstractService";

class MusicService extends AbstractService {

    getAll() {
       return this.get(`/musics`);
    }

    getOne(music_id) {
        return this.get(`/musics/${music_id}`, {});
    }

    update(music_id, data) {
        return this.put(`/musics/${music_id}`, data);
    }

    create(data) {
        return this.post(`/musics`, data);
    }

    deleteMusic(music_id) {
        return this.delete(`/musics/${music_id}`);
    }
}

export default new MusicService();