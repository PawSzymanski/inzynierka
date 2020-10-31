package com.dent.jpa;

import com.dent.entities.Patient;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource()
public interface PatientJpa extends CrudRepository<Patient, Long> {


}
