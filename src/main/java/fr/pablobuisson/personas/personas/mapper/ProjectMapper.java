package fr.pablobuisson.personas.personas.mapper;

import fr.pablobuisson.personas.personas.dto.ProjectDto;
import fr.pablobuisson.personas.personas.model.Project;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface ProjectMapper {
    Project toEntity(ProjectDto projectDto);

    ProjectDto toDto(Project project);
}
