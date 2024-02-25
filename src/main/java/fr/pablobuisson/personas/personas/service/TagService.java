package fr.pablobuisson.personas.personas.service;

import fr.pablobuisson.personas.personas.dto.TagDto;
import fr.pablobuisson.personas.personas.mapper.TagMapper;
import fr.pablobuisson.personas.personas.model.Tag;
import fr.pablobuisson.personas.personas.repository.TagRepository;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
@Data
public class TagService {
    private final TagRepository tagRepository;
    private final TagMapper tagMapper;

    public List<TagDto> getAll() {
        return this.tagRepository.findAll().stream().map(this.tagMapper::toDto).toList();
    }

    public TagDto getById(Long id) {
        return this.tagMapper.toDto(this.tagRepository.findById(id).orElse(null));
    }

    public TagDto create(TagDto projectDto) {
        Tag projectToCreate = this.tagMapper.toEntity(projectDto);
        Tag projectSaved = this.tagRepository.save(projectToCreate);
        return this.tagMapper.toDto(projectSaved);
    }

    public void delete(Long id) {
        this.tagRepository.deleteById(id);
    }
}
