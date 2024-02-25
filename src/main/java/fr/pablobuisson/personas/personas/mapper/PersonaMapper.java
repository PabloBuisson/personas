package fr.pablobuisson.personas.personas.mapper;

import fr.pablobuisson.personas.personas.dto.PersonaDto;
import fr.pablobuisson.personas.personas.model.Persona;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;
import org.mapstruct.ReportingPolicy;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING)
public interface PersonaMapper {
    Persona toEntity(PersonaDto personaDto);

    PersonaDto toDto(Persona persona);
}