package com.dent.jpa;

import com.dent.entities.History;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource()
public interface HistoryJpa extends CrudRepository<History, Long> {

    List<History> findAllByPatient_Id(Long id);

}
