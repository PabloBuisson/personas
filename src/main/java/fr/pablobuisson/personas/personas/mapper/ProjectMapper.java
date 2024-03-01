package fr.pablobuisson.personas.personas.mapper;

import fr.pablobuisson.personas.personas.dto.ProjectDto;
import fr.pablobuisson.personas.personas.model.Project;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE,
        componentModel = MappingConstants.ComponentModel.SPRING,
        uses = PersonaMapper.class)
public interface ProjectMapper {
    ProjectMapper INSTANCE = Mappers.getMapper( ProjectMapper.class );

    @Mapping(target = "personas", ignore = true)
    Project toEntity(ProjectDto projectDto);

    @Mapping(target = "personas", ignore = true)
    ProjectDto toDto(Project project);
}
