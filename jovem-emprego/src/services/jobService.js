import api from "./api";

export default {
  list() {
    return api.listJobs();
  },
  create(job) {
    return api.createJob(job);
  },
};
