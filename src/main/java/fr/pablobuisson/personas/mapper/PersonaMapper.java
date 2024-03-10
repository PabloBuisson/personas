package fr.pablobuisson.personas.mapper;

import fr.pablobuisson.personas.dto.PersonaDto;
import fr.pablobuisson.personas.model.Persona;
import org.mapstruct.*;
import org.mapstruct.factory.Mappers;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING)
public interface PersonaMapper {
    PersonaMapper INSTANCE = Mappers.getMapper( PersonaMapper.class );

    @Mapping(target = "project.personas", ignore = true)
    Persona toEntity(PersonaDto personaDto);

    @Mapping(target = "project.personas", ignore = true)
    PersonaDto toDto(Persona persona);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    Persona partialUpdate(PersonaDto personaDto, @MappingTarget Persona persona);
}
