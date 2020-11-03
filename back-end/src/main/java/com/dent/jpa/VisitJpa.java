package com.dent.jpa;

import com.dent.entities.Visit;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource()
public interface VisitJpa extends CrudRepository<Visit, Long> {

    List<Visit> findAllByPatient_Id(Long patientId);
}
