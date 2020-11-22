package com.dent.jpa;

import com.dent.entities.Receipt;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource()
public interface ReceiptJpa extends CrudRepository<Receipt, Long> {
}
