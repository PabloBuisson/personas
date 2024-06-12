package fr.pablobuisson.personas_backend.mapper;

import fr.pablobuisson.personas_backend.dto.ProjectDto;
import fr.pablobuisson.personas_backend.model.Project;
import org.mapstruct.*;
import org.mapstruct.factory.Mappers;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE,
        componentModel = MappingConstants.ComponentModel.SPRING,
        uses = PersonaMapper.class)
public interface ProjectMapper {
    ProjectMapper INSTANCE = Mappers.getMapper( ProjectMapper.class );

    Project toEntity(ProjectDto projectDto);

    ProjectDto toDto(Project project);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    Project partialUpdate(ProjectDto projectDto, @MappingTarget Project project);
}
