package fr.pablobuisson.personas_backend.service;

import fr.pablobuisson.personas_backend.dto.PersonaDto;
import fr.pablobuisson.personas_backend.dto.ProjectDto;
import fr.pablobuisson.personas_backend.dto.SummaryDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@AllArgsConstructor
@Data
public class UserService {
    private final ProjectService projectService;
    private final PersonaService personaService;

    @Transactional
    public SummaryDto getSummary() {
        List<ProjectDto> projects = projectService.getLastProjects();
        List<PersonaDto> personas = personaService.getLastPersonas();

        return new SummaryDto(projects, personas);
    }
}
