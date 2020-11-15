package com.dent.jpa;

import com.dent.entities.PhotoHistory;
import com.dent.enums.TeethView;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource()
public interface PhotoHistoryJpa extends CrudRepository<PhotoHistory, Long> {

    PhotoHistory findByVisit_IdAndTeethView(Long visit_id, TeethView teethView);

    List<PhotoHistory> findAll();
}
