package com.dent.jpa;

import com.dent.entities.Calendar;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.time.LocalDateTime;
import java.util.List;

@RepositoryRestResource()
public interface CalendarJpa extends CrudRepository<Calendar, Long> {

    boolean existsByToIsBeforeAndFromIsAfter(LocalDateTime from, LocalDateTime from2);

    boolean existsByFrom(LocalDateTime from);

    List<Calendar> findAll();
}
