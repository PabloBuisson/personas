package fr.pablobuisson.personas_backend.mapper;

import fr.pablobuisson.personas_backend.dto.EmotionalMotivationsDto;
import fr.pablobuisson.personas_backend.model.EmotionalMotivations;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE,
        componentModel = MappingConstants.ComponentModel.SPRING)
public interface EmotionalMotivationsMapper {
    EmotionalMotivationsMapper INSTANCE = Mappers.getMapper( EmotionalMotivationsMapper.class );

    EmotionalMotivations toEntity(EmotionalMotivationsDto emotionalMotivationsDto);

    EmotionalMotivationsDto toDto(EmotionalMotivations emotionalMotivations);
}
