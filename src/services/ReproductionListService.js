import AbstractService from "services/AbstractService";

class ReproductionListService extends AbstractService {

    getAll() {
       return this.get(`/lists`);
    }

    getOne(list_id) {
        return this.get(`/lists/${list_id}`, {});
    }

    getByName(name) {
        return this.get(`/lists/${name}`, {});
    }

    update(list_id, data) {
        return this.put(`/lists/${list_id}`, data);
    }

    create(data) {
        return this.post(`/lists`, data);
    }

    deleteReproductionList(list_id) {
        return this.delete(`/lists/id/${list_id}`);
    }
}

export default new ReproductionListService();