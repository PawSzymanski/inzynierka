package com.dent.jpa;

import com.dent.entities.Receipt;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource()
public interface ReceiptJpa extends CrudRepository<Receipt, Long> {

    List<Receipt> findAllByPatient_Id(Long patientId);
}
