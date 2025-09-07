import { Icon } from "@iconify/react";
import { useState, useMemo, useEffect } from "react";
import { useGetAssignablePermission } from "../../hooks/permission/useGetAssignablePermissions";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { useGetSchoolAdminPermissions } from "../../hooks/permission/useGetSchoolAdminPermissions";
import { useRevokeSchoolAdminPermissions } from "../../hooks/permission/useRevokeSchoolAdminPermission";
import { useGivePermissionSchoolAdmin } from "../../hooks/permission/useGivePermissionSchoolAdmin";
import { useSelector } from "react-redux";
function RemovePermissions({ schoolAdminId }) {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const {
    data: permissionData,
    isFetching,
    error,
  } = useGetSchoolAdminPermissions(schoolAdminId);
  const { mutate: revokePermissions, isPending } = useRevokeSchoolAdminPermissions();
  const [selectedPermissionIds, setSelectedPermissionIds] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const allPermissions = useMemo(() => {
    return permissionData?.data || [];
  }, [permissionData]);

  const filteredPermissions = useMemo(() => {
    if (!debouncedSearchTerm) {
      return allPermissions;
    }

    const lowercasedSearchTerm = debouncedSearchTerm.toLowerCase();

    return allPermissions
      .map((category) => {
        const filteredCategoryPermissions = category.permissions.filter(
          (permission) =>
            permission.name.toLowerCase().includes(lowercasedSearchTerm) ||
            (permission.description &&
              permission.description
                .toLowerCase()
                .includes(lowercasedSearchTerm))
        );
        return {
          ...category,
          permissions: filteredCategoryPermissions,
        };
      })
      .filter((category) => category.permissions.length > 0);
  }, [allPermissions, debouncedSearchTerm]);

  const allOriginalPermissionIds = useMemo(() => {
    return allPermissions.flatMap((category) =>
      category.permissions.map((p) => p.id)
    );
  }, [allPermissions]);

  // Check if all permissions are selected (based on original, unfiltered list)
  const areAllPermissionsSelected = useMemo(() => {
    if (allOriginalPermissionIds.length === 0) return false;
    return allOriginalPermissionIds.every((id) =>
      selectedPermissionIds.has(id)
    );
  }, [allOriginalPermissionIds, selectedPermissionIds]);

  // Handle "Select All" checkbox
  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedPermissionIds(new Set(allOriginalPermissionIds));
    } else {
      setSelectedPermissionIds(new Set());
    }
  };

  // Handle "Select All within a Category" checkbox
  const handleSelectCategory = (categoryId, categoryPermissions, event) => {
    setSelectedPermissionIds((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (event.target.checked) {
        categoryPermissions.forEach((p) => newSelected.add(p.id));
      } else {
        categoryPermissions.forEach((p) => newSelected.delete(p.id));
      }
      return newSelected;
    });
  };

  // Handle single permission checkbox
  const handleSelectPermission = (permissionId, event) => {
    setSelectedPermissionIds((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (event.target.checked) {
        newSelected.add(permissionId);
      } else {
        newSelected.delete(permissionId);
      }
      return newSelected;
    });
  };

  // Determine if a category checkbox should be checked or indeterminate
  const getCategoryCheckboxState = (categoryPermissions) => {
    const categoryIds = categoryPermissions.map((p) => p.id);
    const selectedInCategory = categoryIds.filter((id) =>
      selectedPermissionIds.has(id)
    );

    if (selectedInCategory.length === 0) {
      return { checked: false, indeterminate: false };
    } else if (selectedInCategory.length === categoryIds.length) {
      return { checked: true, indeterminate: false };
    } else {
      return { checked: false, indeterminate: true };
    }
  };

  // Determine the indeterminate state for the main "Select All" checkbox
  const selectAllCheckboxRef = useMemo(() => {
    const ref = (element) => {
      if (element) {
        element.indeterminate =
          selectedPermissionIds.size > 0 && !areAllPermissionsSelected;
      }
    };
    return ref;
  }, [selectedPermissionIds, areAllPermissionsSelected]);

  if (isFetching) {
    return <SingleSpinner />;
  }

  if (error) {
    return (
      <div className="text-danger">
        Error loading permissions: {error.message}
      </div>
    );
  }
  return (
    <>
      <div>
        <div className="d-flex flex-row align-items-center justify-content-end">
          <div className="d-flex align-items-center gap-2">
            <span className="font-size-sm">Select All</span>
            <div>
              <input
                type="checkbox"
                className={`${darkMode ? 'dark-bg-light dark-mode-border' : null } form-check-input`}
                checked={areAllPermissionsSelected}
                onChange={handleSelectAll}
                ref={selectAllCheckboxRef}
              />
            </div>
          </div>
        </div>
        <div>
          <input
            type="search"
            className={`${darkMode ? 'dark-mode-input' : 'null' } w-100 form-control font-size-sm`}
            placeholder="Search Permission"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="modal-content-child">
          {filteredPermissions.length === 0 && !isFetching ? (
            <div className="text-center mt-4">
              {debouncedSearchTerm
                ? "No matching permissions found."
                : "No assignable permissions found."}
            </div>
          ) : (
            filteredPermissions.map((category) => {
              const { checked, indeterminate } = getCategoryCheckboxState(
                category.permissions
              );
              const categoryCheckboxRef = (element) => {
                if (element) {
                  element.indeterminate = indeterminate;
                }
              };

              return (
                <div
                  key={category.id || category.category.name}
                  className="mb-3"
                >
                  <div className="d-flex flex-row align-items-center justify-content-between">
                    <span className="fw-semibold font-size-sm">
                      {category.category.name}
                    </span>
                    <div>
                      <input
                        type="checkbox"
                        className={`${darkMode ? 'dark-bg-light dark-mode-border' : null } form-check-input`}
                        checked={checked}
                        onChange={(e) =>
                          handleSelectCategory(
                            category.id,
                            category.permissions,
                            e
                          )
                        }
                        ref={categoryCheckboxRef}
                      />
                    </div>
                  </div>
                  {category.permissions.map((permission) => (
                    <div
                      key={permission.id}
                      className="d-flex flex-row align-items-center justify-content-between my-2 ms-3"
                    >
                      <div className="d-flex flex-column">
                        <span className="font-size-sm">{permission.name}</span>
                        <span className="font-size-sm fw-light">
                          {permission.description || "Permission Description"}
                        </span>
                      </div>
                      <div>
                        <input
                          type="checkbox"
                          className={`${darkMode ? 'dark-bg-light dark-mode-border' : null } form-check-input`}
                          checked={selectedPermissionIds.has(permission.id)}
                          onChange={(e) =>
                            handleSelectPermission(permission.id, e)
                          }
                        />
                      </div>
                    </div>
                  ))}
                </div>
              );
            })
          )}
        </div>
        <button
          className="border-none rounded-3 p-2 font-size-sm w-100 mt-4 primary-background text-white"
          onClick={() => {
            const currentlySelectedNames = Array.from(
              selectedPermissionIds
            ).map((id) => {
              const allPermissionsMap = new Map();
              allPermissions.forEach((category) => {
                category.permissions.forEach((p) => {
                  allPermissionsMap.set(p.id, p.name);
                });
              });
              return (
                allPermissionsMap.get(id) || `Unknown Permission (ID: ${id})`
              );
            });
            revokePermissions({
              schoolAdminId,
              currentlySelectedNames
            })
          }}
        disabled={isPending}
        >
         {
          isPending ? <SingleSpinner /> : "Remove Permissions"
         }
        </button>
      </div>
    </>
  );
}

function AssignedPermissions({ schoolAdminId }) {
  const {
    data: permissionData,
    isFetching,
    error,
  } = useGetSchoolAdminPermissions(schoolAdminId);

  return (
    <>
      <div>
        <div>
          <input
            type="search"
            className="w-100 form-control my-2"
            placeholder="Search Permission"
          />
        </div>
        <div>
          <div className="d-flex flex-row align-items-center justify-content-between">
            <span className="fw-semibold font-size-sm">
              Permission Category
            </span>
            <div>
              <input type="checkbox" className="form-check-input" />
            </div>
          </div>
          <div className="d-flex flex-row align-items-center justify-content-between my-2">
            <div className="d-flex flex-column">
              <span className="font-size-sm fw-semibold">Permission Name</span>
              <span className="font-size-sm fw-light">
                Permission Description
              </span>
            </div>
            <div>
              <input type="checkbox" className="form-check-input" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function AssignablePermissions({ schoolAdminId }) {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const {
    data: permissionData,
    isFetching,
    error,
  } = useGetAssignablePermission(schoolAdminId);
  const { mutate: assignPermissions, isPending } =
    useGivePermissionSchoolAdmin();
  const [selectedPermissionIds, setSelectedPermissionIds] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const allPermissions = useMemo(() => {
    return permissionData?.data || [];
  }, [permissionData]);

  const filteredPermissions = useMemo(() => {
    if (!debouncedSearchTerm) {
      return allPermissions;
    }

    const lowercasedSearchTerm = debouncedSearchTerm.toLowerCase();

    return allPermissions
      .map((category) => {
        const filteredCategoryPermissions = category.permissions.filter(
          (permission) =>
            permission.name.toLowerCase().includes(lowercasedSearchTerm) ||
            (permission.description &&
              permission.description
                .toLowerCase()
                .includes(lowercasedSearchTerm))
        );
        return {
          ...category,
          permissions: filteredCategoryPermissions,
        };
      })
      .filter((category) => category.permissions.length > 0);
  }, [allPermissions, debouncedSearchTerm]);

  const allOriginalPermissionIds = useMemo(() => {
    return allPermissions.flatMap((category) =>
      category.permissions.map((p) => p.id)
    );
  }, [allPermissions]);

  // Check if all permissions are selected (based on original, unfiltered list)
  const areAllPermissionsSelected = useMemo(() => {
    if (allOriginalPermissionIds.length === 0) return false;
    return allOriginalPermissionIds.every((id) =>
      selectedPermissionIds.has(id)
    );
  }, [allOriginalPermissionIds, selectedPermissionIds]);

  // Handle "Select All" checkbox
  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedPermissionIds(new Set(allOriginalPermissionIds));
    } else {
      setSelectedPermissionIds(new Set());
    }
  };

  // Handle "Select All within a Category" checkbox
  const handleSelectCategory = (categoryId, categoryPermissions, event) => {
    setSelectedPermissionIds((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (event.target.checked) {
        categoryPermissions.forEach((p) => newSelected.add(p.id));
      } else {
        categoryPermissions.forEach((p) => newSelected.delete(p.id));
      }
      return newSelected;
    });
  };

  // Handle single permission checkbox
  const handleSelectPermission = (permissionId, event) => {
    setSelectedPermissionIds((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (event.target.checked) {
        newSelected.add(permissionId);
      } else {
        newSelected.delete(permissionId);
      }
      return newSelected;
    });
  };

  // Determine if a category checkbox should be checked or indeterminate
  const getCategoryCheckboxState = (categoryPermissions) => {
    const categoryIds = categoryPermissions.map((p) => p.id);
    const selectedInCategory = categoryIds.filter((id) =>
      selectedPermissionIds.has(id)
    );

    if (selectedInCategory.length === 0) {
      return { checked: false, indeterminate: false };
    } else if (selectedInCategory.length === categoryIds.length) {
      return { checked: true, indeterminate: false };
    } else {
      return { checked: false, indeterminate: true };
    }
  };

  // Determine the indeterminate state for the main "Select All" checkbox
  const selectAllCheckboxRef = useMemo(() => {
    const ref = (element) => {
      if (element) {
        element.indeterminate =
          selectedPermissionIds.size > 0 && !areAllPermissionsSelected;
      }
    };
    return ref;
  }, [selectedPermissionIds, areAllPermissionsSelected]);

  if (isFetching) {
    return <SingleSpinner />;
  }

  if (error) {
    return (
      <div className="text-danger">
        Error loading permissions: {error.message}
      </div>
    );
  }

  return (
    <>
      <div>
        <div className="d-flex flex-row align-items-center justify-content-end">
          <div className="d-flex align-items-center gap-2">
            <span className="font-size-sm">Select All</span>
            <div className="pe-2">
              <input
                type="checkbox"
                className={`${darkMode ? 'dark-bg-light dark-mode-border' : null } form-check-input`}
                checked={areAllPermissionsSelected}
                onChange={handleSelectAll}
                ref={selectAllCheckboxRef}
              />
            </div>
          </div>
        </div>
        <div className="px-2 my-2">
          <input
            type="search"
            className={`${darkMode ? 'dark-mode-input' : 'null' } w-100 form-control font-size-sm`}
            placeholder="Search Permission"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="modal-content-child px-2">
          {filteredPermissions.length === 0 && !isFetching ? (
            <div className="text-center mt-4">
              {debouncedSearchTerm
                ? "No matching permissions found."
                : "No assignable permissions found."}
            </div>
          ) : (
            filteredPermissions.map((category) => {
              const { checked, indeterminate } = getCategoryCheckboxState(
                category.permissions
              );
              const categoryCheckboxRef = (element) => {
                if (element) {
                  element.indeterminate = indeterminate;
                }
              };

              return (
                <div
                  key={category.id || category.category.name}
                  className="mb-3"
                >
                  <div className="d-flex flex-row align-items-center justify-content-between">
                    <span className="fw-semibold font-size-sm">
                      {category.category.name}
                    </span>
                    <div>
                      <input
                        type="checkbox"
                        className={`${darkMode ? 'dark-bg-light dark-mode-border' : null } form-check-input`}
                        checked={checked}
                        onChange={(e) =>
                          handleSelectCategory(
                            category.id,
                            category.permissions,
                            e
                          )
                        }
                        ref={categoryCheckboxRef}
                      />
                    </div>
                  </div>
                  {category.permissions.map((permission) => (
                    <div
                      key={permission.id}
                      className="d-flex flex-row align-items-center justify-content-between my-2 ms-3"
                    >
                      <div className="d-flex flex-column">
                        <span className="font-size-sm">{permission.name}</span>
                        <span className="font-size-sm fw-light">
                          {permission.description || "Permission Description"}
                        </span>
                      </div>
                      <div>
                        <input
                          type="checkbox"
                          className={`${darkMode ? 'dark-bg-light dark-mode-border' : null } form-check-input`}
                          checked={selectedPermissionIds.has(permission.id)}
                          onChange={(e) =>
                            handleSelectPermission(permission.id, e)
                          }
                        />
                      </div>
                    </div>
                  ))}
                </div>
              );
            })
          )}
        </div>
        <button
          className="border-none rounded-3 p-2 font-size-sm w-100 mt-4 primary-background text-white"
          onClick={() => {
            const currentlySelectedNames = Array.from(
              selectedPermissionIds
            ).map((id) => {
              const allPermissionsMap = new Map();
              allPermissions.forEach((category) => {
                category.permissions.forEach((p) => {
                  allPermissionsMap.set(p.id, p.name);
                });
              });
              return (
                allPermissionsMap.get(id) || `Unknown Permission (ID: ${id})`
              );
            });

            assignPermissions({
              schoolAdminId: schoolAdminId,
              permissions: currentlySelectedNames,
            });
          }}
          disabled={isPending}
        >
          {isPending ? <SingleSpinner /> : "Assign Permission"}
        </button>
      </div>
    </>
  );
}

function ManagePermission({ rowData, handleClose }) {
  const [toggle, setToggle] = useState({
    assignablePermission: true,
    removablePermission: false,
    assignedPermission: false,
  });

  const handleToggle = (activeTab) => {
    setToggle({
      assignablePermission: activeTab === "assignablePermission",
      removablePermission: activeTab === "removablePermission",
      assignedPermission: activeTab === "assignedPermission",
    });
  };

  const toggleOptions = [
    { key: "assignablePermission", label: "Assignable Permissions" },
    { key: "removablePermission", label: "Removable Permissions" },
    { key: "assignedPermission", label: "Assigned Permissions" },
  ];

  return (
    <>
      <div>
        <div className="d-flex flex-row align-items-center justify-content-between mb-3">
          <span>Manage School Admin Permissions</span>
          <span onClick={handleClose} style={{ cursor: "pointer" }}>
            <Icon icon="proicons:cancel" />
          </span>
        </div>
        <div className="d-flex gap-2 flex-row my-4">
          {toggleOptions.map((option) => (
            <button
              key={option.key}
              className={`permission-toggle ${
                toggle[option.key]
                  ? "permission-toggle-active"
                  : "permission-toggle-inactive"
              }`}
              onClick={() => handleToggle(option.key)}
            >
              {option.label}
            </button>
          ))}
        </div>
        {toggle.assignablePermission ? (
          <AssignablePermissions schoolAdminId={rowData.id} />
        ) : toggle.removablePermission ? (
          <RemovePermissions schoolAdminId={rowData.id} />
        ) : toggle.assignedPermission ? (
          <AssignedPermissions schoolAdminId={rowData.id} />
        ) : null}
      </div>
    </>
  );
}

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default ManagePermission;
