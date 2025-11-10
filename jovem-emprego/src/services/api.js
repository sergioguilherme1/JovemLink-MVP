let jobs = [
  { id: 1, title: "Estágio em TI", company: "TechCo" },
  { id: 2, title: "Dev Jr", company: "SoftWorks" },
];

export default {
  listJobs() {
    return Promise.resolve(jobs);
  },

  createJob(job) {
    const newJob = { id: Date.now(), ...job };
    jobs.push(newJob);
    return Promise.resolve(newJob);
  },
};
