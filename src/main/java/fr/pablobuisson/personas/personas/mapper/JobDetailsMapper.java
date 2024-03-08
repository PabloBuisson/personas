package fr.pablobuisson.personas.personas.mapper;

import fr.pablobuisson.personas.personas.dto.JobDetailsDto;
import fr.pablobuisson.personas.personas.model.JobDetails;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE,
        componentModel = MappingConstants.ComponentModel.SPRING)
public interface JobDetailsMapper {
    JobDetailsMapper INSTANCE = Mappers.getMapper( JobDetailsMapper.class );

    JobDetails toEntity(JobDetailsDto jobDetailsDto);

    JobDetailsDto toDto(JobDetails jobDetails);
}
