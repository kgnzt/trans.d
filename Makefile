
lint:
ifeq ($(BUILD_ENV),ci)
	grunt jshint:file
else
	grunt jshint:stdout
endif

raw-unit-test:
ifeq ($(BUILD_ENV),ci)
	grunt mochaTest:unit_file
else
	grunt mochaTest:unit_stdout
endif
unit-test: compile raw-unit-test

# complete test sequence
test: lint \
      raw-unit-test \

.PHONY: compile-lib \
        compile-test \
        compile \
        install \
        version-install \
        lint \
        raw-unit-test \
        unit-test \
        integration-test \
        raw-integration-test \
        validation-test \
        raw-validation-test \
        version-test
