package fr.pablobuisson.personas.personas.mapper;

import fr.pablobuisson.personas.personas.dto.PersonaDto;
import fr.pablobuisson.personas.personas.model.Persona;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING)
public interface PersonaMapper {
    PersonaMapper INSTANCE = Mappers.getMapper( PersonaMapper.class );

    @Mapping(target = "project.personas", ignore = true)
    Persona toEntity(PersonaDto personaDto);

    @Mapping(target = "project.personas", ignore = true)
    PersonaDto toDto(Persona persona);
}
