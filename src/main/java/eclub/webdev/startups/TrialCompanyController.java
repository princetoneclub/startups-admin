package eclub.webdev.startups;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/trialcompany")
public class TrialCompanyController {
    private TrialCompanyRepository repository;

    @Autowired
    public TrialCompanyController(TrialCompanyRepository repository) {
        this.repository = repository;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<TrialCompany> get(@PathVariable("id") Long id) {
        TrialCompany company = repository.findOne(id);
        if (null == company)
            return new ResponseEntity<TrialCompany>(HttpStatus.NOT_FOUND);
        return new ResponseEntity<TrialCompany>(company, HttpStatus.OK);
    }

    @RequestMapping(value = "/new", method = RequestMethod.POST)
    public ResponseEntity<TrialCompany> update(@RequestBody TrialCompany company) {
        repository.save(company);
        return get(company.getId());
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PATCH)
    public ResponseEntity<TrialCompany> updateItem(@PathVariable("id") Long id, @RequestBody TrialCompany obj) {
        TrialCompany trialcompany = repository.findOne(id);
        if (null == trialcompany)
            return new ResponseEntity<TrialCompany>(HttpStatus.NOT_FOUND);
        trialcompany.updateParameters(obj);
        repository.save(trialcompany);
        return get(trialcompany.getId());
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
        public ResponseEntity<TrialCompany> delete(@PathVariable("id") Long id) {
        TrialCompany trialcompany = repository.findOne(id);
        if (trialcompany == null)
            return new ResponseEntity<TrialCompany>(HttpStatus.NOT_FOUND);
        repository.delete(loan);
        return new ResponseEntity<TrialCompany>(trialcompany, HttpStatus.OK);
    }

    @RequestMapping
    public List<TrialCompany> all() {
        return repository.findAll();
    }
}