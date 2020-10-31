package com.dent.config;

import com.dent.entities.History;
import com.dent.entities.Patient;
import com.dent.entities.PhotoHistory;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;

@Configuration
public class SpringDataRestConfiguration implements RepositoryRestConfigurer {

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
        config.exposeIdsFor(
                History.class,
                Patient.class,
                PhotoHistory.class
        );
    }
}