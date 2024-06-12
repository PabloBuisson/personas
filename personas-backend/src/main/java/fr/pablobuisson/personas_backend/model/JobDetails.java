package fr.pablobuisson.personas_backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity(name = "JobDetailsEntity")
@Table(name = "job_details")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@Builder
public class JobDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String company;

    private String industry;

    private String salary;

    private String title;

    @OneToOne(mappedBy = "job")
    private Persona persona;
}
