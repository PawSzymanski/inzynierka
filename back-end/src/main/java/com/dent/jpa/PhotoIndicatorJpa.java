package com.dent.jpa;

import com.dent.entities.PhotoIndicator;
import com.dent.enums.TeethView;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource()
public interface PhotoIndicatorJpa extends CrudRepository<PhotoIndicator, Long> {

    List<PhotoIndicator> findAllByVisit_IdAndTeethView(Long visitId, TeethView teethView);

}
