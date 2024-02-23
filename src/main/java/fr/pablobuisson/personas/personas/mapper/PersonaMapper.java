package fr.pablobuisson.personas.personas.mapper;

import fr.pablobuisson.personas.personas.dto.PersonaDto;
import fr.pablobuisson.personas.personas.model.Persona;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface PersonaMapper {
    Persona toEntity(PersonaDto personaDto);

    PersonaDto toDto(Persona persona);
}
